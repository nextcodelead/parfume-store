'use client'
import React, { useState } from 'react';
import { ChevronLeft, Lock } from 'lucide-react';
import { FormData, FormErrors } from '../types/checkoutTypes';
import { STEPS, DELIVERY_METHODS } from '../data/checkoutData';
import { validateForm } from '../utils/validation';
import StepIndicator from '../components/checkout/StepIndicator';
import ContactForm from '../components/checkout/ContactForm';
import DeliveryAddressForm from '../components/checkout/DeliveryAddressForm';
import DeliveryMethodSelection from '../components/checkout/DeliveryMethodSelection';
import PaymentMethodSelection from '../components/checkout/PaymentMethodSelection';
import ReviewOrder from '../components/checkout/ReviewOrder';
import OrderSummary from '../components/checkout/OrderSummary';
import OrderSuccess from '../components/checkout/OrderSuccess';
import Button from '../components/Button';
import { useCreateOrder } from '../hooks/useBuy';

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderPk, setOrderPk] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    apartment: '',
    zipCode: '',
    deliveryNote: '',
    saveAddress: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [deliveryMethod, setDeliveryMethod] = useState('STANDARD');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [createOrder, {loading, error}] = useCreateOrder();

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = async () => {
    console.log('Current step:', currentStep);
    console.log('Form data before validation:', formData);

    const validationErrors = validateForm(formData, currentStep);
    console.log('Validation errors:', validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if(currentStep === 0) {
      const response = await createOrder({
        variables: {
          pk: orderPk,
          "order": {
            "name": formData.firstName,
            "surname": formData.lastName,
            "email": formData.email,
            "phone": formData.phone
          }
        }
      })

    const data = response.data;
    if (data && 'createUpdateOrder' in data) {
      const newOrderPk = (data as any).createUpdateOrder.pk;
      setOrderPk(newOrderPk);
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error('Order creation failed:', data);
    }
    } else if(currentStep === 1) {
      const response = await createOrder({
        variables: {
          pk: orderPk,
          order: {
            "country": formData.country,
            "city": formData.city,
            "street": formData.address,
            "apartment": formData.apartment,
            "zipCode": formData.zipCode,
            "deliveryNotes": formData.deliveryNote,
            "deliveryType": deliveryMethod
          }
        }
      })
      const data = response.data;
      if (data) {
        setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Ошибка при обновлении заказа. Пожалуйста, попробуйте еще раз.');
      }
    } else if(currentStep === 2) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setCurrentStep(0);
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const deliveryPrice = DELIVERY_METHODS.find(m => m.id === deliveryMethod)?.price || 0;

  if (showSuccess) {
    return <OrderSuccess email={formData.email} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌸</span>
              <h1 className="text-xl font-bold">Checkout</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <StepIndicator currentStep={currentStep} steps={STEPS} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 0 && (
              <ContactForm 
                formData={formData} 
                errors={errors} 
                onChange={handleInputChange} 
              />
            )}

            {currentStep === 1 && (
              <>
                <DeliveryAddressForm 
                  formData={formData} 
                  errors={errors} 
                  onChange={handleInputChange} 
                />
                <DeliveryMethodSelection 
                  selected={deliveryMethod} 
                  onChange={setDeliveryMethod} 
                />
              </>
            )}

            {currentStep === 2 && (
              <PaymentMethodSelection 
                selected={paymentMethod} 
                onChange={setPaymentMethod} 
              />
            )}

            {currentStep === 3 && (
              <ReviewOrder
                formData={formData}
                deliveryMethod={deliveryMethod}
                paymentMethod={paymentMethod}
                deliveryPrice={deliveryPrice}
              />
            )}

            <div className="flex gap-4">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  leftIcon={<ChevronLeft size={20} />}
                >
                  Back
                </Button>
              )}
              
              {currentStep < STEPS.length - 1 ? (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth={currentStep === 0}
                  onClick={handleNext}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  leftIcon={<Lock size={20} />}
                >
                  Place Order
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary deliveryPrice={deliveryPrice} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help? Contact us at <a href="mailto:support@essenceluxe.com" className="text-rose-600 hover:underline">support@essenceluxe.com</a>
          </p>
          <p className="text-xs text-gray-500">
            © 2025 Essence Luxe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;