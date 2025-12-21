import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// simule aqui suas funções reais
async function fetchProducts() {
  const res = await fetch("http://localhost:3000/api/products");
  return res.json(); // esperado: [{id, name}]
}

async function deleteProduct(id: Number) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export default function DeleteProductForm() {
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    (async () => {
      const data = await fetchProducts();
      setProducts(data);
    })();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedId) return alert("Selecione um produto!");
    console.log("Deletando produto com ID:", selectedId);
    if (!confirm("Tem certeza que deseja deletar?")) return;

    const res = await deleteProduct(Number(selectedId));
    alert("Produto deletado!");
    setSelectedId("");
  }

  return (
    <Card className="p-4 border rounded-lg shadow-sm bg-background">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label>Escolha o Produto</Label>
            <Select value={selectedId} onValueChange={setSelectedId} >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {products.length > 0 ? (
                  products.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm">Nenhum produto cadastrado</div>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="destructive" className="w-full">
            Deletar Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
