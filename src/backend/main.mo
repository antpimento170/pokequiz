import Map "mo:core/Map";
import Types "types/quiz";
import Common "types/common";
import QuizApi "mixins/quiz-api";

actor {
  let sessions = Map.empty<Common.SessionId, Types.Session>();
  var nextSessionId = { var value : Nat = 0 };

  include QuizApi(sessions, nextSessionId);
};
