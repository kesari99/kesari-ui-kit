import React, { useState } from "react";

const INITIALDATA = {
  id: "root",
  items: [
    {
      id: "1",
      name: "Recursive components are super powerful! 🚀",
      author: "CodeMaster",
      timestamp: "2 hours ago",
      items: [
        {
          id: "2",
          name: "Totally agree. They make handling nested data so much easier.",
          author: "ReactFan",
          timestamp: "1 hour ago",
          items: [],
        },
      ],
    },
    {
      id: "4",
      name: "Can anyone explain the tree traversal logic?",
      author: "NewbieDev",
      timestamp: "3 hours ago",
      items: [],
    },
  ],
};

const useNode = () => {
  const insertNode = (tree: any, commentId: any, item: any) => {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime().toString(),
        name: item,
        author: "you",
        timestamps: "just now",
        items: [],
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((tree: any) => {
      return insertNode(tree, commentId, item);
    });

    return { ...tree, items: latestNode };
  };

  const editNode = (tree: any, commedtId: any, value: any) => {
    if (tree.id === commedtId) {
      tree.name = value;
      return tree;
    }

    tree.items.map((tree: any) => {
      return editNode(tree, commedtId, value);
    });

    return { ...tree };
  };

  const deleteNode = (tree: any, commentId: any) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];

      if (currentItem.id === commentId) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, commentId);
      }
    }

    return tree;
  };

  return { insertNode, editNode, deleteNode };
};

const ActionArea = () => {};

const CommentItem = () => {};

export default function RecursiveCommentTree() {
  const [commentsData, setCommentsData] = useState(INITIALDATA);
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (commentId: string, item: string) => {
    const finalDataStructure = insertNode({ ...commentsData }, commentId, item);
    setCommentsData(finalDataStructure);
  };

  const handleEditNode = (commentId: string, item: string) => {
    const finalDataStructure = editNode({ ...commentsData }, commentId, item);
    setCommentsData(finalDataStructure);
  };

  const handleDeleteNode = (commentId: string) => {
    const finalDataStructure = deleteNode({ ...commentsData }, commentId);
    setCommentsData(finalDataStructure);
  };

  const CommentItem = ({
    comment,
    handleInsertNode,
    handleEditNode,
    handleDeleteNode,
  }: any) => {

    const onAddComment = () => {

    }

    




  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10 flex justify-center font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"></div>
    </div>
  );

  return <div></div>;
}
