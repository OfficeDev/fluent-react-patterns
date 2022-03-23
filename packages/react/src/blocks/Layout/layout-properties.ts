import { LayoutProps as NaturalLayoutProps } from '@fluent-blocks/schemas'
import { LayoutItemPropsOrElement } from './LayoutItem'

export interface LayoutProps extends Omit<NaturalLayoutProps, 'layout'> {
  layout: Omit<NaturalLayoutProps['layout'], 'items'> & {
    items: LayoutItemPropsOrElement[]
  }
}
