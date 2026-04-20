import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatientInfo } from '../../types';
import { useLang } from '../../i18n/LangContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

function buildSchema(tr: { firstNameErr: string; lastNameErr: string; phoneErr: string; phoneInvalid: string; emailErr: string; ageErr: string; genderErr: string }) {
  return z.object({
    firstName: z.string().min(2, tr.firstNameErr),
    lastName: z.string().min(2, tr.lastNameErr),
    phone: z.string().min(10, tr.phoneErr).regex(/^[0-9+\s-]+$/, tr.phoneInvalid),
    email: z.string().email(tr.emailErr),
    age: z.string().min(1, tr.ageErr),
    gender: z.enum(['male', 'female'], { message: tr.genderErr }),
    reason: z.string().optional(),
  });
}

type FormData = {
  firstName: string; lastName: string; phone: string; email: string;
  age: string; gender: 'male' | 'female'; reason?: string;
};

interface BookingFormProps {
  defaultValues?: Partial<PatientInfo>;
  onSubmit: (data: PatientInfo) => void;
}

export function BookingForm({ defaultValues, onSubmit }: BookingFormProps) {
  const { tr } = useLang();
  const schema = buildSchema(tr);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ? { ...defaultValues, age: defaultValues.age?.toString() } : undefined,
  });

  function handleValid(data: FormData) {
    const age = parseInt(data.age, 10);
    if (isNaN(age) || age < 1 || age > 120) return;
    onSubmit({ ...data, age } as PatientInfo);
  }

  return (
    <form onSubmit={handleSubmit(handleValid)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label={tr.firstName} placeholder={tr.firstNamePh} error={errors.firstName?.message} {...register('firstName')} />
        <Input label={tr.lastName} placeholder={tr.lastNamePh} error={errors.lastName?.message} {...register('lastName')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label={tr.phone} placeholder={tr.phonePh} type="tel" error={errors.phone?.message} {...register('phone')} />
        <Input label={tr.email} placeholder={tr.emailPh} type="email" error={errors.email?.message} {...register('email')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label={tr.age} type="number" min={1} max={120} placeholder={tr.agePh} error={errors.age?.message} {...register('age')} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#1a1a1a]">{tr.gender}</label>
          <select
            className={`border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20 ${errors.gender ? 'border-red-400' : 'border-[#E5E7EB]'}`}
            {...register('gender')}
          >
            <option value="">{tr.selectGender}</option>
            <option value="male">{tr.male}</option>
            <option value="female">{tr.female}</option>
          </select>
          {errors.gender && <span className="text-xs text-red-500">{errors.gender.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#1a1a1a]">{tr.reason}</label>
        <textarea rows={3} placeholder={tr.reasonPh}
          className="border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20 resize-none"
          {...register('reason')} />
      </div>

      <Button type="submit" size="lg" fullWidth>{tr.submitNext}</Button>
    </form>
  );
}
