import React, { useState } from "react";
import { Tree, getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { find } from "lodash";

// Dados iniciais para a árvore
const initialData = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: "Pedro (Diretor)",
    workflow: "diretor",
  },
  {
    id: 2,
    parent: 0,
    droppable: true,
    text: "Pedro (Gerente Regional)",
    workflow: "gerente regional",
  },
  {
    id: 3,
    parent: 0,
    droppable: true,
    text: "Pedro (Gerente Operacional)",
    workflow: "gerente operacional",
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: "Pedro (Coordenador)",
    workflow: "coordenador",
  },
  {
    id: 5,
    parent: 0,
    droppable: true,
    text: "Pedro (Supervisor)",
    workflow: "supervisor",
  },
  {
    id: 6,
    parent: 0,
    droppable: true,
    text: "Pedro (Superior)",
    workflow: "superior",
  },
  {
    id: 7,
    parent: 0,
    droppable: true,
    text: "Pedro (Consultor)",
    workflow: "consultor",
  },
];

const App = () => {
  // State para armazenar os dados da árvore
  const [treeData, setTreeData] = useState(initialData);

  // Função para verificar se a hierarquia é válida entre um item e seu pai
  const isHierarchyValid = (item, parentItem) => {
    const hierarchy = ["diretor", "gerente regional", "gerente operacional", "coordenador", "supervisor", "superior", "consultor"];
    const itemIndex = hierarchy.indexOf(item.workflow);
    const parentIndex = hierarchy.indexOf(parentItem.workflow);
    return itemIndex > -1 && parentIndex > -1 && itemIndex >= parentIndex;
  };

  // Manipulador de evento para quando ocorrer um drop na árvore
  const handleDrop = (newTreeData) => {
    // Verificar a validade da hierarquia entre os itens
    const updatedTreeData = newTreeData.map((node) => {
      if (node.parent !== 0) {
        const parentItem = find(newTreeData, { id: node.parent });
        if (!isHierarchyValid(node, parentItem)) {
          // Item não respeita a hierarquia, retorna o estado original
          return find(treeData, { id: node.id });
        }
      }
      return node;
    });
    setTreeData(updatedTreeData);
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div style={{ marginLeft: depth * 10, margin: 10 }}>
            {/* Renderizar um ícone de expandir/retrair e o texto do item */}
            <span onClick={onToggle}>{isOpen ? " [-] " : " [+] "}</span>
            {node.text}
          </div>
        )}
      />
    </DndProvider>
  );
};

export default App;