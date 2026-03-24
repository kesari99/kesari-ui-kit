import { useState } from "react";
import { Button } from "./ui/button";
import { FileIcon, Folder } from "lucide-react";

const INITIALDATA = {
  root: {
    id: "root",
    type: "folder",
    name: "Root",
    isOpen: "true",
    children: ["1", "2", "3"],
  },
  "1": { id: "1", type: "folder", name: "src", isOpen: true, children: [] },
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function RecursiveFileExplorer() {
  const [nodes, setNodes] = useState(INITIALDATA);
  const [selectedId, setSelectedId] = useState<any>(null);

  //CRUD OPERATION


  const handleToogleNode = (nodeId : any) => {

    setNodes((prev : any) => ({
        ...prev,
        [nodeId] : {...prev[nodeId], isOpen : !prev[nodeId].isOpen}
    }))

  }

  const handleCreateNode = (parentId: string, type: any) => {
    const newId = generateId();

    const newNode = {
      id: newId,
      name: type === "folder" ? "New Folder" : "new_file.js",
      isOpen: type === "folder" ? true : undefined,
      children: type === "folder" ? [] : undefined,
    };

    setNodes((prev: any) => ({
      ...prev,
      [newId]: newNode,
      [parentId]: {
        ...prev[parentId],
        children: [...(prev[parentId].children || []), newId],
      },
    }));

    setSelectedId(newId);
  };

  const handleDeleteNode = (nodeId: any, parentId: any) => {
    const deleteRecursive = (currentId: any, currentNodes: any) => {
      const node = currentNodes[currentId];

      let nextNodes = { ...currentNodes };

      if (node.children) {
        node.children.forEach((childId: any) => {
          nextNodes = deleteRecursive(childId, nextNodes);
        });
      }

      delete nextNodes[currentId];

      return nextNodes;
    };

    setNodes((prev: any) => {
      const newParent: any = {
        ...prev[parentId],
        children: [prev[parentId].children.filter((id: any) => id !== nodeId)],
      };

      let nextNodes = deleteRecursive(nodeId, prev);
      nextNodes[parentId] = newParent;

      return nextNodes;
    });
  };

  const handleRenameNode = (nodeId: any, newName: any) => {
    setNodes((prev: any) => ({
      ...prev,
      [nodeId]: { ...prev[nodeId], name: newName },
    }));
  };

  return <div>

    <div className="flex items-center gap-2">
        <Button className="" onClick={() => handleCreateNode('root', 'file')}   ><FileIcon size={16} /></Button>
        <Button className="" onClick={() => handleCreateNode('root', 'folder')}   ><Folder size={16} /></Button>



    </div>


    <div>
        {
            nodes['root'].children.map((childId: any) => (
                <TreeNode 
                    key={childId}
                    nodeId={childId}
                    nodes={nodes}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onDelete={handleDeleteNode}
                    onRename={handleRenameNode}
                    onCreate={handleCreateNode}
                    onToogle={handleToogleNode}
                />
                
            ))
        }
    </div>





  </div>;
}


const TreeNode = ({nodeId, nodes, selectedId, onSelect, onDelete, onRename, onCreate, onToogle}: any) => {
    const node = nodes[nodeId];
    
    if (!node) return null;
    
    return (
        <div className="text-sm text-grey-300">
            
        </div>
    );
}
