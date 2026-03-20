
import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, ShieldCheck, Zap, MessageSquare, Instagram, Facebook } from 'lucide-react';

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al enviar la reserva');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Booking request error:', err);
      setError(err.message || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 serif">Reserva Tu Estancia</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Garantizamos el mejor precio reservando directamente con nosotros. Sin comisiones de plataformas intermediarias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Benefits Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 serif border-b border-gray-100 pb-4">Ventajas de Reserva Directa</h3>
              <ul className="space-y-5">
                {[
                  { icon: <Zap className="text-yellow-500" />, text: "Precio Mínimo Garantizado" },
                  { icon: <ShieldCheck className="text-green-600" />, text: "Cancelación Flexible" },
                  { icon: <MessageSquare className="text-blue-500" />, text: "Comunicación Directa" },
                  { icon: <CheckCircle className="text-green-500" />, text: "Detalle de Bienvenida" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700">
                    <div className="shrink-0">{item.icon}</div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#4A5D4E] p-8 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-4 serif">¿Necesitas Ayuda?</h3>
              <p className="text-white/80 mb-6">Estamos disponibles para resolver cualquier duda sobre tu reserva por WhatsApp o email.</p>
              <a 
                href="https://wa.me/34695646507" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full text-center bg-white text-[#4A5D4E] py-3 rounded-full font-bold hover:bg-white/90 transition-all mb-6"
              >
                Chat por WhatsApp
              </a>
              <div className="flex justify-center gap-4 border-t border-white/10 pt-6">
                <a 
                  href="https://www.instagram.com/casarural.furones/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                  <span className="text-sm">Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61578333865894" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                  <span className="text-sm">Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            {!submitted ? (
              <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <Calendar size={16} /> Fecha de Entrada
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full bg-[#F3F4F1] border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#4A5D4E] outline-none transition-all"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                        <Calendar size={16} /> Fecha de Salida
                      </label>
                      <input 
                        type="date" 
                        required
                        className="w-full bg-[#F3F4F1] border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#4A5D4E] outline-none transition-all"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                      <Users size={16} /> Número de Huéspedes
                    </label>
                    <select 
                      className="w-full bg-[#F3F4F1] border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#4A5D4E] outline-none transition-all"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                        <option key={n} value={n}>{n} Huéspedes</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Tu nombre..."
                        className="w-full bg-[#F3F4F1] border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#4A5D4E] outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required
                        placeholder="email@ejemplo.com"
                        className="w-full bg-[#F3F4F1] border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#4A5D4E] outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Peticiones Especiales (Opcional)</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-[#F3F4F1] border-none rounded-xl py-4 px-6 focus:ring-2 focus:ring-[#4A5D4E] outline-none transition-all"
                      placeholder="Cuéntanos si viajas con niños, mascotas o si celebras algo especial..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full py-6 bg-[#4A5D4E] text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-[#3D4D40] hover:shadow-2xl transition-all transform hover:-translate-y-1 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Enviando...' : 'Verificar Disponibilidad y Reservar'}
                  </button>
                  <p className="text-center text-gray-400 text-sm">
                    Al pulsar en reservar, nuestro equipo se pondrá en contacto contigo en menos de 2 horas.
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-white p-16 rounded-[2.5rem] shadow-xl text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-4xl font-bold mb-4 serif">¡Solicitud Enviada!</h2>
                <p className="text-xl text-gray-600 max-w-md mb-8">
                  Gracias, {formData.name}. Hemos recibido tu petición de reserva para las fechas {formData.checkIn} al {formData.checkOut}.
                </p>
                <p className="text-gray-500 mb-10 leading-relaxed">
                  Te hemos enviado un correo de confirmación. En breve, uno de nuestros anfitriones contactará contigo para finalizar los detalles y confirmar la estancia.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-[#4A5D4E] text-white px-10 py-4 rounded-full font-bold hover:bg-[#3D4D40] transition-colors"
                >
                  Volver a Empezar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
