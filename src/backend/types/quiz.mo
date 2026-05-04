module {
  // ---- Pokemon data types ----
  public type Generation = Nat; // 1–9

  public type PokemonEntry = {
    id : Nat;
    name : Text;
    types : [Text];
    generation : Generation;
    moves : [Text];
    abilities : [Text];
  };

  // ---- Question types ----
  public type QuestionKind = {
    #guessName;  // show image/number, guess name
    #guessType;  // show name, guess primary type
    #guessMove;  // show name, guess one of its moves
  };

  public type Question = {
    id : Nat;
    pokemonId : Nat;
    pokemonName : Text;
    kind : QuestionKind;
    prompt : Text;
    options : [Text];   // exactly 4 choices
    correctIndex : Nat; // 0–3
  };

  // ---- Session types ----
  public type SessionStatus = { #active; #completed };

  public type Session = {
    id : Nat;
    questions : [Question];
    var answers : [var ?Nat]; // index = question index, value = chosen option index
    var status : SessionStatus;
  };

  // ---- Public (shared) API boundary types ----
  public type QuestionView = {
    id : Nat;
    pokemonId : Nat;
    kind : QuestionKind;
    prompt : Text;
    options : [Text];
  };

  public type SessionView = {
    id : Nat;
    questions : [QuestionView];
    status : SessionStatus;
  };

  public type AnswerResult = {
    correct : Bool;
    correctIndex : Nat;
  };

  public type ScoreResult = {
    score : Nat;
    total : Nat;
    percentage : Nat; // 0–100
  };

  public type QuizConfig = {
    generation : ?Generation; // null = all generations
    questionCount : Nat;      // 5 | 10 | 15 | 20
  };
};
