import { h3, h2, p, div, h1, a } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";
import { toCamel, capitalize, toInputName } from "../util";
import { listItemTag, unorderedListTag } from "../ui";

const theme = getTheme();

const propTitleStyle = sx({
  color: theme.color.secondary.base,
  scrollMarginTop: "60px",
});

const headerStyle = sx({ margin: "16px 0 16px 0" });

const propListStyle = sx({
  color: theme.color.secondary.base,
  margin: "0 0 16px 0",
});

type PropValue = { value: any; title: string };

const renderPropValueItem = (
  propName: string,
  propValue: PropValue,
  componentElement: any,
  defaultProps?: any,
  additionalProps?: (propName: string, value: string) => any
) => {
  return render(componentElement)({
    ...defaultProps,
    [toCamel(propName)]: propValue.value,
    ...(additionalProps ? additionalProps(propName, propValue.value) : {}),
  });
};

const renderPropValues = (
  propName: string,
  propValues: PropValue[] | PropValue,
  componentElement: any,
  defaultProps?: any,
  additionalProps?: (propName: string, value: string) => any
) => {
  if (Array.isArray(propValues)) {
    return propValues
      .map((propValue) => [
        h3(capitalize(propValue.title ?? propValue.value)),
        renderPropValueItem(
          propName,
          propValue,
          componentElement,
          defaultProps,
          additionalProps
        ),
      ])
      .flat();
  } else {
    return [
      renderPropValueItem(
        propName,
        propValues,
        componentElement,
        defaultProps,
        additionalProps
      ),
    ];
  }
};

const renderProp = (
  propName: string,
  description: string,
  propValues: PropValue[] | PropValue,
  componentElement: any,
  defaultProps?: any,
  additionalProps?: (propName: string, value: string) => any
) => [
  h2(capitalize(propName), propTitleStyle, { id: toCamel(propName) }),
  p(description),
  ...renderPropValues(
    propName,
    propValues,
    componentElement,
    defaultProps,
    additionalProps
  ),
];

const render = (componentElement: any) => (propsObj: any) =>
  componentElement(propsObj);

const renderGenericGroup =
  (componentElement: any, defaultProps?: any) =>
  (data: any, propMapping?: any) =>
    renderProp(
      data.name,
      data.description,
      data.data,
      componentElement,
      defaultProps,
      propMapping
    );

const renderGroup =
  (componentName: string, componentElement: any, defaultProps?: any) =>
  (data: any) =>
    renderGenericGroup(componentElement, defaultProps)(
      data,
      (propName: string, value: any) => ({
        ...data.additionalProps,
      })
    );

const renderInputGroup =
  (componentName: string, componentElement: any, defaultProps?: any) =>
  (data: any) =>
    renderGenericGroup(componentElement, defaultProps)(
      data,
      (propName: string, value: any) => ({
        name: toInputName(componentName)(propName, value),
        ...data.additionalProps,
      })
    );

export const renderInputPropsView = (
  componentName: string,
  componentElement: any,
  data: any[],
  defaultProps?: any
) =>
  data
    .map(renderInputGroup(componentName, componentElement, defaultProps))
    .flat();

const renderPropsView = (
  componentName: string,
  componentElement: any,
  data: any[],
  defaultProps?: any
) =>
  data.map(renderGroup(componentName, componentElement, defaultProps)).flat();

const renderPropsHeader = (
  componentName: string,
  description: string,
  componentElement: any,
  defaultProps?: any
) => [
  h1(capitalize(componentName)),
  p(description),
  div(headerStyle, componentElement(defaultProps)),
];

export const renderPropsPage = (
  componentName: string,
  description: string,
  data: any[],
  componentElement: any,
  defaultProps?: any
) => [
  ...renderPropsHeader(
    componentName,
    description,
    componentElement,
    defaultProps
  ),
  h2("Props"),
  div(
    sx({ display: "flex", justifyContent: "center" }),
    unorderedListTag(
      data.map((propItem) =>
        listItemTag(
          a({
            children: propItem.name,
            link: `#${toCamel(propItem.name)}`,
          })
        )
      ),
      propListStyle
    )
  ),
  ...renderPropsView(componentName, componentElement, data, defaultProps),
];
