import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateProducts } from "../services/productService";

export interface ProductFormValues {
  name: string;
  description?: string;
}

export default function ProductForm() {
  const [form, setForm] = useState<ProductFormValues>({
    name: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      return alert("Nome do produto é obrigatório!");
    }

    try {
      const res = await CreateProducts({ productData: form });
      if (res.success) {
        console.log("submit acionado");
        alert("Produto cadastrado com sucesso!");
        setForm({ name: "", description: "",});
      } else {
        alert("Erro ao cadastrar produto.");
      }
    } catch (error) {
      console.error("Erro no submit:", error);
      alert("Erro ao cadastrar produto. Verifique o console para mais detalhes.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cadastrar Novo Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Teclado Mecânico"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detalhes opcionais..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Cadastrar Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
