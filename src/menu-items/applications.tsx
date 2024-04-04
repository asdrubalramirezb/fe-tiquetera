// THIRD - PARTY
import { FormattedMessage } from 'react-intl';

// ASSETS
import { Bill, Calendar1, Kanban, KyberNetwork, Messages2, Profile2User, ShoppingBag, UserSquare } from 'iconsax-react';

// TYPE
import { NavItemType } from 'types/menu';

// ICONS
const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.applications,
  type: 'group',
  children: [
    {
      id: 'products',
      title: <FormattedMessage id="products" />,
      type: 'item',
      icon: icons.ecommerce,
      url: '/apps/e-commerce/products',
      breadcrumbs: false
    }
  ]
};

export default applications;
