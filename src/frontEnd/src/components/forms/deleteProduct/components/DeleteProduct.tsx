import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


async function fetchProducts() {
  const res = await fetch("http://localhost:3000/api/products");
  return res.json(); 
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
    console.log("Delete response:", res);
    alert("Produto deletado!");
    setSelectedId("");
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Deletar Produto</CardTitle>
      </CardHeader>
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
