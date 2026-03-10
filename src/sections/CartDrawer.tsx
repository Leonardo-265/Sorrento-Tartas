import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, MapPin, Clock, Truck, Store } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

type DeliveryType = 'retiro' | 'delivery';

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  const [deliveryType, setDeliveryType] = useState<DeliveryType>('retiro');
  const [address, setAddress] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
  ];

  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(
        (item) =>
          `- ${item.quantity}x ${item.name} ($${item.price.toLocaleString()})`
      )
      .join('\n');

    const deliveryInfo = deliveryType === 'delivery' 
      ? `\n📍 *Envío a:* ${address}` 
      : '\n🏪 *Retiro en local* (Estomba 159)';

    const customerInfo = customerName ? `\n👤 *Nombre:* ${customerName}` : '';
    const notesInfo = notes ? `\n📝 *Notas:* ${notes}` : '';

    const message = `¡Hola! Quiero hacer un pedido:\n\n${itemsList}\n\n*Total: $${totalPrice.toLocaleString()}*${deliveryInfo}\n⏰ *Horario:* ${timeSlot}${customerInfo}${notesInfo}\n\n¿Cómo puedo abonar?`;

    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/5492915371382?text=${message}`, '_blank');
    setIsCartOpen(false);
  };

  const canCheckout = items.length > 0 && timeSlot !== '' && (deliveryType === 'retiro' || (deliveryType === 'delivery' && address.trim() !== ''));

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="bg-[#F4EFE6] border-l border-[#1A1A1A]/10 w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-[#1A1A1A]/10">
          <SheetTitle className="flex items-center gap-2 text-[#1A1A1A]">
            <ShoppingBag className="w-5 h-5" />
            Tu pedido
            {totalItems > 0 && (
              <span className="text-sm font-normal text-[#6E6A60]">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag className="w-16 h-16 text-[#6E6A60]/30 mb-4" />
                <p className="text-[#6E6A60]">Tu carrito está vacío</p>
                <p className="text-sm text-[#6E6A60]/70 mt-1">
                  Agregá algunas tartas deliciosas
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-[0.12em] text-[#6E6A60]">
                    Productos
                  </h3>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-[16px] p-4 flex gap-4"
                    >
                      <div className="w-20 h-20 rounded-[12px] overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#1A1A1A] text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#6E6A60] mb-2">
                          ${item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-full bg-[#F4EFE6] flex items-center justify-center hover:bg-[#E9E1D2] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-full bg-[#F4EFE6] flex items-center justify-center hover:bg-[#E9E1D2] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#6E6A60] hover:text-[#C41E3A] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Options */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono uppercase tracking-[0.12em] text-[#6E6A60]">
                    Forma de entrega
                  </h3>
                  
                  <RadioGroup
                    value={deliveryType}
                    onValueChange={(value) => setDeliveryType(value as DeliveryType)}
                    className="grid grid-cols-2 gap-3"
                  >
                    <div>
                      <RadioGroupItem
                        value="retiro"
                        id="retiro"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="retiro"
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-[16px] border-2 border-transparent cursor-pointer transition-all peer-data-[state=checked]:border-[#C41E3A] peer-data-[state=checked]:bg-[#C41E3A]/5 hover:bg-[#F4EFE6]"
                      >
                        <Store className="w-6 h-6 mb-2 text-[#6E6A60] peer-data-[state=checked]:text-[#C41E3A]" />
                        <span className="text-sm font-medium text-[#1A1A1A]">Retiro</span>
                        <span className="text-xs text-[#6E6A60]">Estomba 159</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="delivery"
                        id="delivery"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="delivery"
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-[16px] border-2 border-transparent cursor-pointer transition-all peer-data-[state=checked]:border-[#C41E3A] peer-data-[state=checked]:bg-[#C41E3A]/5 hover:bg-[#F4EFE6]"
                      >
                        <Truck className="w-6 h-6 mb-2 text-[#6E6A60] peer-data-[state=checked]:text-[#C41E3A]" />
                        <span className="text-sm font-medium text-[#1A1A1A]">Delivery</span>
                        <span className="text-xs text-[#6E6A60]">A tu domicilio</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Address Input (only for delivery) */}
                  {deliveryType === 'delivery' && (
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm text-[#1A1A1A]">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Dirección de entrega
                      </Label>
                      <Input
                        id="address"
                        placeholder="Calle, número, barrio..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-white border-[#1A1A1A]/10 focus:border-[#C41E3A] focus:ring-[#C41E3A]"
                      />
                    </div>
                  )}
                </div>

                {/* Time Slot */}
                <div className="space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-[0.12em] text-[#6E6A60]">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Horario de {deliveryType === 'retiro' ? 'retiro' : 'entrega'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`p-3 rounded-[12px] text-sm font-medium transition-all ${
                          timeSlot === slot
                            ? 'bg-[#C41E3A] text-white'
                            : 'bg-white text-[#1A1A1A] hover:bg-[#E9E1D2]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-[#1A1A1A]">
                    Tu nombre (opcional)
                  </Label>
                  <Input
                    id="name"
                    placeholder="¿Cómo te llamamos?"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-white border-[#1A1A1A]/10 focus:border-[#C41E3A] focus:ring-[#C41E3A]"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm text-[#1A1A1A]">
                    Notas adicionales (opcional)
                  </Label>
                  <textarea
                    id="notes"
                    placeholder="¿Algo que debamos saber?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-white border border-[#1A1A1A]/10 rounded-[12px] text-sm focus:border-[#C41E3A] focus:ring-1 focus:ring-[#C41E3A] outline-none resize-none"
                    rows={3}
                  />
                </div>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="text-sm text-[#6E6A60] hover:text-[#C41E3A] transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="flex-col gap-4 border-t border-[#1A1A1A]/10 p-6 bg-[#F4EFE6]">
            {/* Total */}
            <div className="flex justify-between items-center w-full">
              <span className="text-[#6E6A60]">Subtotal</span>
              <span className="font-medium">${totalPrice.toLocaleString()}</span>
            </div>
            {deliveryType === 'delivery' && (
              <div className="flex justify-between items-center w-full text-sm">
                <span className="text-[#6E6A60]">Envío</span>
                <span className="text-[#6E6A60]">A coordinar</span>
              </div>
            )}
            <div className="flex justify-between items-center w-full text-lg font-bold">
              <span>Total</span>
              <span className="text-[#C41E3A]">${totalPrice.toLocaleString()}</span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={!canCheckout}
              className="w-full bg-[#C41E3A] hover:bg-[#a01830] disabled:bg-[#6E6A60]/30 disabled:cursor-not-allowed text-white py-6 rounded-full text-base font-medium"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Pedir por WhatsApp
            </Button>

            {!canCheckout && (
              <p className="text-xs text-center text-[#6E6A60]">
                {deliveryType === 'delivery' && !address 
                  ? 'Completá tu dirección para continuar' 
                  : 'Seleccioná un horario para continuar'}
              </p>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
