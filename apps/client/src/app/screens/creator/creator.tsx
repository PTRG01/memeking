import { useState } from "react";
import { EditorDocument } from "../../types";

/* eslint-disable-next-line */
export interface CreatorProps {}

export function Creator(props: CreatorProps) {
  const [doc] = useState<EditorDocument>();
  return (
    <div>
      <h1>Welcome to Creator!</h1>
      {doc && <img src={doc.image} alt="Generated meme" />}
    </div>
  );
}

export default Creator;
