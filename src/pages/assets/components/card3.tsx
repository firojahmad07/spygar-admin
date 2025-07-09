import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ICard3Props {
  badge?: boolean;
  logo: string;
  title: string;
  total: string;
  star: string;
  label?: string;
  sku?: string;
  category1?: string;
  category2?: string;
  badgeLabel?: string;
}

export function Card3({
  badge,
  logo,
  title,
  badgeLabel,
  sku,
  total,
  star,
  label,
  category1,
  category2,
}: ICard3Props) {

  return (
    <Card>
      <CardContent className="flex items-center flex-wrap justify-between p-2 pe-5 gap-4.5">
        <div className="flex items-center gap-3.5">
          <Card className="flex items-center justify-center bg-accent/50 h-[170px] w-[255px] shadow-none">
            <img
              src={toAbsoluteUrl(`/media/store/client/600x600/${logo}`)}
              className="h-[70px] cursor-pointer"
              alt="image"
            />
          </Card>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-normal text-secondary-foreground line-through">
            {label} afsad
          </span>
          <span className="text-sm font-medium text-mono">${total} 45</span>
        </div>
      </CardContent>
    </Card>
  );
}
