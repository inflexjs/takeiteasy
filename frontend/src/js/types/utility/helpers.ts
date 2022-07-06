export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never

export type SizePropsType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
export type ViewPropsType = 'brand' | 'secondary'
export type DisabledPropsType = boolean | ''
export type TagPropsType = 'div' | 'a' | 'button' | 'label' | 'strong'
export type DirectionPropsType = 'row' | 'column'
