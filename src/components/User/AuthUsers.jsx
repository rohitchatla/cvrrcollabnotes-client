//shows all authorized users
import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import Button from "@material-ui/core/Button";
export default function AuthUsers({ groupId }) {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    function clicked(userId) {
      fetch("https://cvrrcollabnotes.herokuapp.com/api/note/removeauthuser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: groupId,
          auth_user: userId,
        }),
      });
    }
    const noteId = groupId;
    fetch("https://cvrrcollabnotes.herokuapp.com/api/note/getauthusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: noteId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        const items = json.map((item) => {
          return (
            <Button
              style={{ margin: "0.2rem", width: "220px" }}
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => {
                clicked(item._id);
              }}
            >
              <UserItem data={item} />
            </Button>
          );
        });
        setUsers(items);
      });
  });

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#00adb5",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "3px solid black",
        overflow: "auto",
        width: "270px",
        maxHeight: "200px",
        display: "inline",
        position: "absolute",
        right: "1rem",
        top: "23rem",
      }}
    >
      <p>Authorized Users (Click to remove)</p>
      {users}
    </div>
  );
}
