import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/api";


async function fetchProducts() {
    const res = await api.get("/products");
    return res.data;
}


async function entryProduct(id: number, quantity: number, type: string) {
    const res = await api.post("/stock-moviments", {
        product_id: id,
        quantity,
        type,
    });
    return res.data; // Return the JSON data instead of the full response
}

export default function EntryProduct() {
    const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
    const [selectedId, setSelectedId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        (async () => {
            const data = await fetchProducts();
            console.log("Fetched products:", data);
            setProducts(data);
        })();
    }, []);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!selectedId) return alert("Selecione um produto!");
        if (!quantity || Number(quantity) <= 0) return alert("Digite uma quantidade válida!");
        if (!type) return alert("Selecione o tipo de movimento!");

        try {
            const res = await entryProduct(Number(selectedId), Number(quantity), type);
            console.log("Response data:", res); // Log the response to debug
            if (res && res.success) {
                alert("Movimento registrado com sucesso!");
                setSelectedId("");
                setQuantity("");
                setType("");
            } else {
                alert("Erro ao registrar movimento.");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao registrar movimento. Verifique o console.");
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Entrada/Saída de Produto</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Produto</Label>
                        <Select value={selectedId} onValueChange={setSelectedId}>
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

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="quantity">Quantidade</Label>
                        <Input
                            id="quantity"
                            type="number"
                            placeholder="Ex: 10"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label>Tipo de Movimento</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione in ou out" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="in">Entrada (in)</SelectItem>
                                <SelectItem value="out">Saída (out)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full">
                        Registrar Movimento
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}