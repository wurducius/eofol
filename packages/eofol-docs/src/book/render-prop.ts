import { h3, h2, p } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";
import { toCamel, capitalize, toInputName } from "../util";

const theme = getTheme();

const propTitleStyle = sx({ color: theme.color.secondary.base });

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
  h2(capitalize(propName), propTitleStyle),
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

export const renderPropsView = (
  componentName: string,
  componentElement: any,
  data: any[],
  defaultProps?: any
) =>
  data.map(renderGroup(componentName, componentElement, defaultProps)).flat();
