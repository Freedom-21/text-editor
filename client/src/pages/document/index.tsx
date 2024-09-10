import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import useGetUsers from "utils/hooks/api/useGetUser";

const interval_ms = 500;
export default function DocumentEditor() {
  const { loggedUser } = useGetUsers();
  const { first_name, last_name } = loggedUser || {};

  Quill.register("modules/cursors", QuillCursors);

  const { id: doc_id } = useParams();
  const [newSocket, setSocket] = useState(io);
  const [quill, setQuill] = useState<Quill>();
    
  useEffect(() => {
    if (newSocket == null || quill == null) return;

    // Set up the module
    const cursors = quill.getModule("cursors");

    // Add event listener for cursor updates
    newSocket.on(
      "cursorChange",
      (cursorData: {
        clientId: string;
        range: string;
        name: string;
        color: string;
      }) => {
        const { clientId, range, name, color } = cursorData;
        cursors.createCursor(clientId, name, color);
        cursors.moveCursor(clientId, range);
      }
    );

    // Add event listener for range change in quill editor
    quill.on("selection-change", (range, oldRange, source) => {
      if (range) {
        const cursorData = {
          clientId: newSocket.id,
          range: range,
          name: first_name || "Guest",
          color: "#1E56A0", // Provide unique colors for different users
        };
        newSocket.emit("cursorChange", cursorData);
      }
    });

    return () => {
      newSocket.off("cursorChange");
    };
  }, [newSocket, quill]);

  //UseEffect1
  useEffect(() => {
    // const r = Math.floor(Math.random() * 10) + 1;
    const s_socket = io("localhost:5000", {
      query: { username: `${first_name} ${last_name}` },
    });
    setSocket(s_socket);

    console.log(s_socket, "isn't work and why");
    return () => {
      s_socket.disconnect();
    };
  }, []);

  //UseEffect22
  useEffect(() => {
    if (newSocket == null || quill == null) return; //check to make sure we have a socket adn a quill

    const socket_handler = (delta: any) => {
      quill.updateContents(delta);
    };
    newSocket.on("receive-changes", socket_handler);

    return () => {
      newSocket.off("receive-changes ", socket_handler);
    };
  }, [newSocket, quill]);

  //UseEffect3
  useEffect(() => {
    if (newSocket == null || quill == null) return;

    const socket_handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== "user") return;
      newSocket.emit("send-changes", delta);
    };
    quill.on("text-change", socket_handler);

    return () => {
      quill.off("text-change", socket_handler);
    };
  }, [newSocket, quill]);

  //useEffect4
  useEffect(() => {
    if (newSocket == null || quill == null) return;

    newSocket.once("load-document", (document_loaded: any) => {
      quill.setContents(document_loaded);
      quill.enable();
    });

    newSocket.emit("get-document", doc_id);
  }, [newSocket, quill, doc_id]);

  //useEffect5
  useEffect(() => {
    if (newSocket == null || quill == null) return;

    const time_interval = setInterval(() => {
      newSocket.emit("save-document", quill.getContents());
    }, interval_ms);

    return () => {
      clearInterval(time_interval);
    };
  }, [newSocket, quill]);

  const wrapperReference = useCallback((wrapper: any) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q_quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: ToolBarArea, cursors: true },
    });
    q_quill.disable();
    q_quill.setText("Loading............");
    setQuill(q_quill);
  }, []);
  return <div className="container" ref={wrapperReference}></div>;
}

const ToolBarArea = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }], //Default font used in quill
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: ["#ffffff", "orange", "yellow"] }, { background: ["#ffffff"] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];
