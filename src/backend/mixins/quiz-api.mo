import Types "../types/quiz";
import Common "../types/common";
import Map "mo:core/Map";
import PokemonData "../lib/pokemon-data";
import QuizLib "../lib/quiz";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";

/// Mixin providing all public quiz endpoints.
/// State injected: sessions map, nextSessionId counter.
mixin (
  sessions : Map.Map<Common.SessionId, Types.Session>,
  nextSessionId : { var value : Nat },
) {
  /// Creates a new quiz session and returns its view.
  public func createSession(config : Types.QuizConfig) : async Types.SessionView {
    let pool = PokemonData.byGeneration(config.generation);
    let count = if (config.questionCount == 0) 10 else config.questionCount;
    // use time as seed for randomness
    let seed = Int.abs(Time.now()) % 999999937;
    let picked = PokemonData.pickRandom(pool, count, seed);
    let questions = QuizLib.generateQuestions(picked, seed);
    let sessionId = nextSessionId.value;
    nextSessionId.value += 1;
    let session : Types.Session = {
      id = sessionId;
      questions;
      var answers = Array.tabulate(questions.size(), func(_ : Nat) : ?Nat { null }).toVarArray<(?Nat)>();
      var status = #active;
    };
    sessions.add(sessionId, session);
    QuizLib.sessionToView(session);
  };

  /// Returns the session questions (without correct answers).
  public query func getSession(sessionId : Common.SessionId) : async ?Types.SessionView {
    switch (sessions.get(sessionId)) {
      case (?s) ?QuizLib.sessionToView(s);
      case null null;
    };
  };

  /// Submits an answer for a specific question in a session.
  public func submitAnswer(
    sessionId : Common.SessionId,
    questionIndex : Nat,
    chosenIndex : Nat,
  ) : async ?Types.AnswerResult {
    switch (sessions.get(sessionId)) {
      case null null;
      case (?session) {
        if (session.status == #completed) return null;
        if (questionIndex >= session.questions.size()) return null;
        session.answers[questionIndex] := ?chosenIndex;
        // check if all questions answered → mark completed
        let allAnswered = session.answers.toArray().all(func(a : ?Nat) : Bool { a != null });
        if (allAnswered) {
          session.status := #completed;
        };
        ?QuizLib.checkAnswer(session.questions[questionIndex], chosenIndex);
      };
    };
  };

  /// Returns the final score for a completed session.
  public query func getScore(sessionId : Common.SessionId) : async ?Types.ScoreResult {
    switch (sessions.get(sessionId)) {
      case null null;
      case (?session) {
        ?QuizLib.computeScore(session);
      };
    };
  };
};
