import { useActionState } from "react";
import { useOpinion } from "../store/opinions-context";
import { useOptimistic } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  } = useOpinion();

  const [optimisticVotes, setOptimisticVotes] = useOptimistic(
    votes,
    (prev, mode) => (mode === "up" ? prev + 1 : prev - 1),
  );

  const [upvoteOpinionState, upvoteOpinionAction, upvoteOpinionPending] =
    useActionState(async () => {
      setOptimisticVotes("up");
      await upvoteOpinion(id);
    }, null);
  const [downvoteOpinionState, downvoteOpinionAction, downvoteOpinionPending] =
    useActionState(async () => {
      setOptimisticVotes("down");
      await downvoteOpinion(id);
    }, null);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteOpinionAction}
          disabled={upvoteOpinionPending || downvoteOpinionPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downvoteOpinionAction}
          disabled={upvoteOpinionPending || downvoteOpinionPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
