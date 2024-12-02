import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CustomersTable } from './customers-table';

export default function Customers() {
  return (
    
      <CardContent>
        <CustomersTable offset={0}/>
      </CardContent>
    
  );
}
