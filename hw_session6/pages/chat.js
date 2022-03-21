import { ConversationInfo } from "../chat/conversationInfo.js";
import { ConversationList } from "../chat/conversationList.js";

class Chat {
  activeConversation;

  container = document.createElement("div");
  btnLogout = document.createElement("button");

  conversationList = new ConversationList();
  conversationInfor = new ConversationInfo();

  constructor() {
    this.container.appendChild(this.conversationList.container);
    this.conversationList.setOnConversationItemClick(
      this.setActiveConversation
    );
    this.container.appendChild(this.conversationInfor.container);
    this.subcribeConversation();
  }

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    console.log({ conversation });
    this.conversationInfor.setName(conversation.name);
    this.conversationList.setStyleActiveConversation(conversation);
  };

  subcribeConversation = () => {
    db.collection("conversations").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New conversation: ", change.doc.data());

          this.conversationList.handleCreateConversationAdded(
            change.doc.id,
            change.doc.data().name,
            change.doc.data().users
          );
        }
        if (change.type === "modified") {
          console.log("Modified conversation: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed conversation: ", change.doc.data());
        }
      });
    });
  };
}

export { Chat };
