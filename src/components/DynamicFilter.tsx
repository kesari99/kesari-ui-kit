import { useState } from "react";
import { Button } from "./ui/button";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

type FieldType = "text" | "number" | "email" | "checkbox" | "date";

interface Field {
  id: string;
  label: string;
  type: FieldType;
}

interface FieldEditorProps {
  field: Field;
  index: number;
  onUpdate: (id: string, changes: Partial<Field>) => void;
  onDelete: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const FieldEditor = ({
  field,
  index,
  onUpdate,
  onDelete,
  onMove,
}: FieldEditorProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: any) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData("text/plain"));
    const toIndex = index;

    if (fromIndex !== toIndex) {
      onMove(fromIndex, toIndex);
    }
  };

  return (
    <div 
    draggable
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    className={`bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center animate-in fade-in slide-in-from-bottom-2 duration-300
      ${isDragging ? 'opacity-50 border-dashed border-blue-400' : ''} cursor-default`}
  >      <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center justify-center cursor-move text-gray-400 hover:text-gray-600 p-1">
        <GripVertical size={20} />
      </div>
        <Input
          className="border p-2 rounded text-sm w-full outline-none focus:border-blue-400"
          placeholder="Field Label"
          value={field.label}
          onChange={(e) => onUpdate(field.id, { label: e.target.value })}
        ></Input>

        <Select
          value={field.type}
          onValueChange={(value: FieldType) =>
            onUpdate(field.id, { type: value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="checkbox">Checkbox</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          onClick={() => onDelete(field.id)}
          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded transition self-end sm:self-center"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

interface FormPreviewProps {
  fields: Field[];
}

const FormPreview = ({ fields }: FormPreviewProps) => {
  return (
    <div className="p-5 flex flex-col gap-4">
      {fields.map((field) => (
        <div key={field.id} className="text-sm font-medium">
          {field.type === "checkbox" ? (
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Checkbox id={field.id} />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-2">
              <Label>{field.label}</Label>

              <Input type={field.type} placeholder={`Enter ${field.label}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FormBuilder = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const addFilter = () => {
    const newField: Field = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: "New Field",
      type: "text",
    };

    setFields([...fields, newField]);
  };

  const updateFields = (id: string, changes: Partial<Field>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...changes } : field
      )
    );
  };

  const deleteFields = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const moveFields = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields];
    const [movedItem] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedItem);
    setFields(newFields);
  };

  return (
    <div className="flex gap-4 items-start">
      <Card className="w-1/3">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h1>Form Builder</h1>
            <Button
              onClick={addFilter}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-md active:scale-95"
            >
              <Plus size={18} /> Add Field
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="gap-4 flex flex-col ">
            {fields.map((field, index) => (
              <FieldEditor
                key={field.id}
                index={index}
                field={field}
                onUpdate={updateFields}
                onDelete={deleteFields}
                onMove={moveFields}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Form Builder Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <FormPreview fields={fields} />
        </CardContent>
      </Card>
    </div>
  );
};

export default function DynamicFilter() {
  return (
    <div>
      <FormBuilder />
    </div>
  );
}
