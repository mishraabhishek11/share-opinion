import { useActionState } from "react";
import { useOpinion } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  } = useOpinion();

  const newOpinionAction = async (prev, formData) => {
    const data = Object.fromEntries(formData.entries());

    const errors = [];

    if (data.userName.trim().length === 0) {
      errors.push("provide user name");
    }

    if (data.title.trim().length === 0) {
      errors.push("provide title");
    }

    if (data.body.trim().length === 0) {
      errors.push("provide body");
    }

    if (errors && errors.length > 0) {
      return {
        errors,
        values: { ...data },
      };
    }

    await addOpinion({ ...data });

    return { errors: [], values: { userName: "", title: "", body: "" } };
  };

  const [opinionState, opinionAction] = useActionState(newOpinionAction, {
    errors: [],
    values: { userName: "", title: "", body: "" },
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={opinionAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={opinionState.values.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={opinionState.values.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={opinionState.values.body}
          ></textarea>
        </p>

        {opinionState &&
        opinionState.errors &&
        opinionState.errors.length > 0 ? (
          <ul className="errors">
            {opinionState.errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        ) : null}

        <Submit />
      </form>
    </div>
  );
}
