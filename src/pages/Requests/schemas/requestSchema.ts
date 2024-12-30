```typescript
import * as yup from 'yup';

export const requestSchema = yup.object({
  type: yup.string()
    .oneOf(['random', 'meaningful', 'performance', 'use-of-force'])
    .required('Review type is required'),
  
  priority: yup.string()
    .oneOf(['standard', 'priority', 'urgent'])
    .required('Priority level is required'),
  
  videos: yup.array()
    .of(yup.object({
      id: yup.string().required(),
      name: yup.string().required(),
      size: yup.number()
        .max(2 * 1024 * 1024 * 1024, 'File size must not exceed 2GB'),
      duration: yup.number().required(),
      status: yup.string().required()
    }))
    .min(1, 'At least one video is required'),
  
  officers: yup.array()
    .of(yup.object({
      id: yup.string().required(),
      name: yup.string().required(),
      badge: yup.string().required()
    }))
    .min(1, 'At least one officer must be selected'),
  
  incidentDate: yup.date()
    .max(new Date(), 'Incident date cannot be in the future')
    .nullable(),
  
  caseNumber: yup.string()
    .matches(/^[A-Za-z0-9-]+$/, 'Invalid case number format')
    .nullable()
});
```