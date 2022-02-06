import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./utils/firebase-config";
import {
  doc,
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { type } from "os";

interface ListProps {
  id: string;
  lists: string;
}

function App() {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState<string[]>([]);

  useEffect(() => {
    const q = query(collection(db, "youtubeUrl"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLists(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as unknown as string)
        )
      );
      setInput("");
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (input) {
      addDoc(collection(db, "youtubeUrl"), {
        name: input,
        timestamp: new Date(),
      }).catch((err) => console.error(err));
    }
  };

  async function deleteDocument(id: string) {
    let request = await deleteDoc(doc(db, "youtubeUrl", id));
    console.log(request);
  }

  async function updateDocument(id: string) {
    const itemRef = doc(db, "youtubeUrl", id);
    let name = prompt("What would you like to update it to?");
    setDoc(itemRef, {
      name: name,
      timestamp: new Date(),
    });
  }

  return (
    <div className="App">
      <h2>url list:</h2>
      <div>
        <form>
          <input
            type="text"
            name="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleClick}>Save</button>
        </form>
        <div>
          {lists.map((list: any) => (
            <>
              <div key={list.id}>
                <p>{list.name}</p>
                <button onClick={() => updateDocument(list.id)}>
                  Edit\Update
                </button>
                <button onClick={() => deleteDocument(list.id)}>Delete</button>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
