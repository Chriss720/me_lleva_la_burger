import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../api/client';
import { AdminLayout } from '../../components/admin/AdminLayout';

interface Ingredient {
    id: number;
    nombre: string;
    cantidad: string;
    unidad: string;
    estado: string;
    alerta: boolean;
    mensaje?: string;
}

const AdminIngredientsPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
    const [formData, setFormData] = useState({
        nombre: '',
        cantidad: '',
        unidad: '',
        estado: 'En Stock',
        alerta: false,
        mensaje: ''
    });

    // Fetch ingredients
    const { data: ingredients = [], isLoading } = useQuery<Ingredient[]>({
        queryKey: ['ingredients'],
        queryFn: async () => {
            const res = await client.get('/ingredient');
            return res.data?.data || res.data;
        }
    });

    // Create mutation
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            await client.post('/ingredient', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            setShowModal(false);
            resetForm();
        }
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: any }) => {
            await client.patch(`/ingredient/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            setShowModal(false);
            setEditingIngredient(null);
            resetForm();
        }
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await client.delete(`/ingredient/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
        }
    });

    const resetForm = () => {
        setFormData({
            nombre: '',
            cantidad: '',
            unidad: '',
            estado: 'En Stock',
            alerta: false,
            mensaje: ''
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Set message based on alert status or clear it if alerta is false
        const dataToSubmit = { ...formData };
        if (!dataToSubmit.alerta) {
            dataToSubmit.mensaje = '';
        }

        if (editingIngredient) {
            updateMutation.mutate({ id: editingIngredient.id, data: dataToSubmit });
        } else {
            createMutation.mutate(dataToSubmit);
        }
    };

    const handleEdit = (ingredient: Ingredient) => {
        setEditingIngredient(ingredient);
        setFormData({
            nombre: ingredient.nombre,
            cantidad: ingredient.cantidad,
            unidad: ingredient.unidad,
            estado: ingredient.estado,
            alerta: ingredient.alerta || false,
            mensaje: ingredient.mensaje || ''
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este ingrediente?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleNewIngredient = () => {
        setEditingIngredient(null);
        resetForm();
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <div className="p-8 bg-black min-h-full text-white">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#FFC72C] font-oswald uppercase">Gestión de Ingredientes</h1>
                    <button onClick={handleNewIngredient} className="bg-[#FFC72C] text-black px-4 py-2 rounded font-bold hover:bg-[#FFB700]">
                        + Nuevo Ingrediente
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFC72C] mx-auto"></div>
                    </div>
                ) : (
                    <div className="bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden mb-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#FFC72C]">
                                    <th className="p-4 text-[#FFC72C] font-bold uppercase">ID</th>
                                    <th className="p-4 text-[#FFC72C] font-bold uppercase">Nombre</th>
                                    <th className="p-4 text-[#FFC72C] font-bold uppercase">Cantidad</th>
                                    <th className="p-4 text-[#FFC72C] font-bold uppercase">Unidad</th>
                                    <th className="p-4 text-[#FFC72C] font-bold uppercase">Estado</th>
                                    <th className="p-4 text-[#FFC72C] font-bold uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.length > 0 ? ingredients.map((ing) => (
                                    <tr key={ing.id} className="border-b border-gray-800 hover:bg-[#222]">
                                        <td className="p-4 text-gray-500 font-mono">#{ing.id}</td>
                                        <td className="p-4 font-bold">{ing.nombre}</td>
                                        <td className="p-4">{ing.cantidad}</td>
                                        <td className="p-4">{ing.unidad}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                ing.estado === 'En Stock' ? 'bg-green-900 text-green-300' :
                                                ing.estado === 'Bajo Stock' ? 'bg-yellow-900 text-yellow-300' :
                                                'bg-red-900 text-red-300'
                                            }`}>
                                                {ing.estado}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(ing)} className="bg-[#FFC72C] text-black px-3 py-1 rounded font-bold hover:bg-[#FFB700] text-sm">
                                                    Editar
                                                </button>
                                                <button onClick={() => handleDelete(ing.id)} className="bg-[#DA291C] text-white px-3 py-1 rounded font-bold hover:bg-[#a81f13] text-sm">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">No hay ingredientes registrados.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Alertas */}
                <div className="bg-[#1a1a1a] rounded-lg border border-[#FFC72C] p-6">
                    <h2 className="text-2xl font-bold text-[#FFC72C] mb-4">Alertas de Inventario</h2>
                    <div className="space-y-3">
                        {ingredients.filter(i => i.alerta).length > 0 ? ingredients.filter(i => i.alerta).map(ing => (
                            <div key={ing.id} className={`p-3 rounded font-bold flex items-center gap-2 ${
                                ing.estado === 'Agotado' ? 'bg-red-900/50 text-red-200 border border-red-900' : 'bg-yellow-900/50 text-yellow-200 border border-yellow-900'
                            }`}>
                                <span className="text-xl">⚠</span>
                                {ing.mensaje || `${ing.nombre} requiere atención`}
                            </div>
                        )) : (
                            <div className="text-gray-500 p-2">No hay alertas de inventario activas en este momento.</div>
                        )}
                    </div>
                </div>

                {/* Modal para Crear/Editar */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="bg-[#1a1a1a] border-2 border-[#FFC72C] rounded-lg p-8 max-w-md w-full">
                            <h3 className="text-2xl font-bold text-[#FFC72C] mb-6">
                                {editingIngredient ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-[#FFC72C] font-bold mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className="w-full bg-[#222] text-white border border-gray-700 rounded p-3"
                                        required
                                        placeholder="Ej. Tomate"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[#FFC72C] font-bold mb-2">Cantidad</label>
                                        <input
                                            type="text"
                                            value={formData.cantidad}
                                            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                                            className="w-full bg-[#222] text-white border border-gray-700 rounded p-3"
                                            required
                                            placeholder="Ej. 10"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#FFC72C] font-bold mb-2">Unidad</label>
                                        <input
                                            type="text"
                                            value={formData.unidad}
                                            onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                                            className="w-full bg-[#222] text-white border border-gray-700 rounded p-3"
                                            required
                                            placeholder="Ej. kg, piezas"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[#FFC72C] font-bold mb-2">Estado</label>
                                    <select
                                        value={formData.estado}
                                        onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                        className="w-full bg-[#222] text-white border border-gray-700 rounded p-3"
                                        required
                                    >
                                        <option value="En Stock">En Stock</option>
                                        <option value="Bajo Stock">Bajo Stock</option>
                                        <option value="Agotado">Agotado</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        id="alerta"
                                        checked={formData.alerta}
                                        onChange={(e) => setFormData({ ...formData, alerta: e.target.checked })}
                                        className="w-5 h-5 accent-[#FFC72C]"
                                    />
                                    <label htmlFor="alerta" className="text-[#FFC72C] font-bold cursor-pointer">
                                        ¿Mostrar alerta en el panel?
                                    </label>
                                </div>
                                {formData.alerta && (
                                    <div>
                                        <label className="block text-[#FFC72C] font-bold mb-2 text-sm mt-2">Mensaje de alerta</label>
                                        <input
                                            type="text"
                                            value={formData.mensaje}
                                            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                            className="w-full bg-[#222] text-white border border-gray-700 rounded p-3"
                                            placeholder="Ej. Reordenar pronto..."
                                            required={formData.alerta}
                                        />
                                    </div>
                                )}
                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="submit"
                                        disabled={createMutation.isPending || updateMutation.isPending}
                                        className="flex-1 bg-[#FFC72C] text-black py-3 rounded font-bold hover:bg-[#FFB700] transition disabled:opacity-50"
                                    >
                                        {editingIngredient ? 'Actualizar' : 'Crear'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingIngredient(null);
                                            resetForm();
                                        }}
                                        className="flex-1 bg-gray-700 text-white py-3 rounded font-bold hover:bg-gray-600 transition"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminIngredientsPage;
