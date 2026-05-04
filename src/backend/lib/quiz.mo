import Types "../types/quiz";
import Array "mo:core/Array";

module {
  /// Shuffles an array of Text using an LCG seed, returns a shuffled copy.
  func shuffleTexts(items : [Text], seed : Nat) : [Text] {
    let arr = items.toVarArray();
    var rng = seed + 1;
    var i = arr.size();
    while (i > 1) {
      rng := (rng * 6364136223846793005 + 1442695040888963407) % 18446744073709551615;
      let j = rng % i;
      let tmp = arr[i - 1];
      arr[i - 1] := arr[j];
      arr[j] := tmp;
      i -= 1;
    };
    arr.toArray();
  };

  /// Picks up to `count` distinct indices from pool size `poolSize`, excluding `excludeIdx`.
  func pickDistractorIndices(poolSize : Nat, excludeIdx : Nat, count : Nat, seed : Nat) : [Nat] {
    // collect all valid candidate indices
    var candidates : [Nat] = Array.tabulate<Nat>(poolSize, func i = i);
    candidates := candidates.filter(func i { i != excludeIdx });
    // shuffle candidates
    let arr = candidates.toVarArray<Nat>();
    var rng = seed + 3;
    var i = arr.size();
    while (i > 1) {
      rng := (rng * 6364136223846793005 + 1442695040888963407) % 18446744073709551615;
      let j = rng % i;
      let tmp = arr[i - 1];
      arr[i - 1] := arr[j];
      arr[j] := tmp;
      i -= 1;
    };
    let take = if (count > arr.size()) arr.size() else count;
    Array.tabulate<Nat>(take, func k { arr[k] });
  };

  /// Builds a Question for the given Pokemon and kind, using other Pokemon as distractors.
  public func buildQuestion(
    idx : Nat,
    pokemon : Types.PokemonEntry,
    kind : Types.QuestionKind,
    pool : [Types.PokemonEntry],
    seed : Nat,
  ) : Types.Question {
    let pokemonIdx = switch (pool.findIndex(func(p) { p.id == pokemon.id })) {
      case (?i) i;
      case null 0;
    };
    switch kind {
      case (#guessName) {
        // prompt: pokemon's first type and generation, answer: its name
        let prompt = "What is the name of Pokemon #" # debug_show(pokemon.id) # "?";
        let correct = pokemon.name;
        let distractorIdxs = pickDistractorIndices(pool.size(), pokemonIdx, 3, seed + idx * 7);
        let distractors = Array.tabulate(distractorIdxs.size(), func(k) { pool[distractorIdxs[k]].name });
        // build 4-option array and find correct position after shuffle
        let allOpts = [correct].concat(distractors);
        let shuffled = shuffleTexts(allOpts, seed + idx * 13);
        let correctIdx = switch (shuffled.findIndex(func(t) { t == correct })) {
          case (?i) i;
          case null 0;
        };
        { id = idx; pokemonId = pokemon.id; pokemonName = pokemon.name; kind; prompt; options = shuffled; correctIndex = correctIdx };
      };
      case (#guessType) {
        let prompt = "What is the primary type of " # pokemon.name # "?";
        let correct = pokemon.types[0];
        // gather distinct types from distractors
        let distractorIdxs = pickDistractorIndices(pool.size(), pokemonIdx, 6, seed + idx * 11);
        var typeOptions : [Text] = [correct];
        for (di in distractorIdxs.values()) {
          let pTypes = pool[di].types;
          if (pTypes.size() > 0) {
            let t = pTypes[0];
            if (not typeOptions.any(func(x) { x == t })) {
              typeOptions := typeOptions.concat([t]);
            };
          };
          if (typeOptions.size() >= 4) { }; // collected enough
        };
        // pad with fallback types if needed
        let fallbacks = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
        var fIdx = 0;
        while (typeOptions.size() < 4 and fIdx < fallbacks.size()) {
          let ft = fallbacks[fIdx];
          if (not typeOptions.any(func(x) { x == ft })) {
            typeOptions := typeOptions.concat([ft]);
          };
          fIdx += 1;
        };
        let fourOpts = Array.tabulate(4, func k { typeOptions[k] });
        let shuffled = shuffleTexts(fourOpts, seed + idx * 17);
        let correctIdx = switch (shuffled.findIndex(func(t) { t == correct })) {
          case (?i) i;
          case null 0;
        };
        { id = idx; pokemonId = pokemon.id; pokemonName = pokemon.name; kind; prompt; options = shuffled; correctIndex = correctIdx };
      };
      case (#guessMove) {
        let prompt = "Which of these is a move that " # pokemon.name # " can learn?";
        let correct = if (pokemon.moves.size() > 0) pokemon.moves[0] else "Tackle";
        let distractorIdxs = pickDistractorIndices(pool.size(), pokemonIdx, 6, seed + idx * 19);
        var moveOptions : [Text] = [correct];
        for (di in distractorIdxs.values()) {
          let pMoves = pool[di].moves;
          if (pMoves.size() > 0) {
            let mv = pMoves[0];
            if (not moveOptions.any(func(x) { x == mv })) {
              moveOptions := moveOptions.concat([mv]);
            };
          };
          if (moveOptions.size() >= 4) { };
        };
        // ensure we have 4
        let fallbackMoves = ["Tackle", "Scratch", "Pound", "Growl", "Leer", "Tail Whip"];
        var fIdx = 0;
        while (moveOptions.size() < 4 and fIdx < fallbackMoves.size()) {
          let fm = fallbackMoves[fIdx];
          if (not moveOptions.any(func(x) { x == fm })) {
            moveOptions := moveOptions.concat([fm]);
          };
          fIdx += 1;
        };
        let fourOpts = Array.tabulate(4, func k { moveOptions[k] });
        let shuffled = shuffleTexts(fourOpts, seed + idx * 23);
        let correctIdx = switch (shuffled.findIndex(func(t) { t == correct })) {
          case (?i) i;
          case null 0;
        };
        { id = idx; pokemonId = pokemon.id; pokemonName = pokemon.name; kind; prompt; options = shuffled; correctIndex = correctIdx };
      };
    };
  };

  /// Generates a full list of questions for a quiz session.
  public func generateQuestions(
    pokemon : [Types.PokemonEntry],
    seed : Nat,
  ) : [Types.Question] {
    let kinds : [Types.QuestionKind] = [#guessName, #guessType, #guessMove];
    Array.tabulate<Types.Question>(pokemon.size(), func(i) {
      let p = pokemon[i];
      // cycle through question kinds
      let kind = kinds[i % 3];
      buildQuestion(i, p, kind, pokemon, seed + i * 31);
    });
  };

  public func toView(q : Types.Question) : Types.QuestionView {
    { id = q.id; pokemonId = q.pokemonId; kind = q.kind; prompt = q.prompt; options = q.options };
  };

  public func sessionToView(s : Types.Session) : Types.SessionView {
    let qs = s.questions.map(func(q) { toView(q) });
    { id = s.id; questions = qs; status = s.status };
  };

  public func checkAnswer(question : Types.Question, chosenIndex : Nat) : Types.AnswerResult {
    { correct = question.correctIndex == chosenIndex; correctIndex = question.correctIndex };
  };

  public func computeScore(session : Types.Session) : Types.ScoreResult {
    let total = session.questions.size();
    var score = 0;
    var i = 0;
    while (i < total) {
      switch (session.answers[i]) {
        case (?chosen) {
          if (session.questions[i].correctIndex == chosen) {
            score += 1;
          };
        };
        case null {};
      };
      i += 1;
    };
    let percentage = if (total == 0) 0 else (score * 100) / total;
    { score; total; percentage };
  };
};
