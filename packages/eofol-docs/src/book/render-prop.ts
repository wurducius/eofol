import { h2, p, div, h1, a, flex } from "@eofol/eofol-simple";
import { getTheme, sx } from "@eofol/eofol";
import { toCamel, capitalize, toInputName } from "../util";
import { listItemTag, unorderedListTag } from "../ui";

const theme = getTheme();

const propTitleStyle = sx({
  color: theme.color.secondary.base,
  scrollMarginTop: "60px",
});

const headerStyle = sx({
  margin: "16px 0 16px 0",
  display: "flex",
  justifyContent: "center",
});

const propListStyle = sx({
  color: theme.color.secondary.base,
  margin: "0 0 16px 0",
});

const propRowStyle = sx({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "64px",
  margin: "16px 0 16px 0",
});

const defaultPropRowStyle = sx({ margin: "16px 0 16px 0" });

type PropValue = { value: any; title: string; additionalProps?: any };

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
    ...propValue.additionalProps,
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
      .map((propValue) =>
        div(propRowStyle, [
          flex(
            { grow: 1, justifyContent: "flex-end" },
            p(capitalize(propValue.title ?? propValue.value))
          ),
          flex(
            { grow: 1, justifyContent: "flex-start" },
            renderPropValueItem(
              propName,
              propValue,
              componentElement,
              defaultProps,
              additionalProps
            )
          ),
        ])
      )
      .flat();
  } else {
    return [
      flex({ justifyContent: "center" }, [
        renderPropValueItem(
          propName,
          propValues,
          componentElement,
          defaultProps,
          additionalProps
        ),
      ]),
    ];
  }
};

const renderProp = (
  propName: string,
  description: string,
  propValues: PropValue[] | PropValue,
  componentElement: any,
  defaultValue: any,
  defaultProps?: any,
  additionalProps?: (propName: string, value: string) => any
) =>
  [
    h2(capitalize(propName), propTitleStyle, { id: toCamel(propName) }),
    p(description),

    defaultValue &&
      div(defaultPropRowStyle, p(`Default value: ${defaultValue}`)),
    ...renderPropValues(
      propName,
      propValues,
      componentElement,
      defaultProps,
      additionalProps
    ).filter(Boolean),
  ].filter(Boolean);

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
      data.default,
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
  div(
    headerStyle,
    componentElement({
      ...defaultProps,
      name: toInputName(componentName)("base"),
    })
  ),
];

const renderPropsMenu = (data: any[]) => [
  h2("Props"),
  flex(
    { justifyContent: "center" },
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
  ...renderPropsMenu(data),
  ...renderPropsView(componentName, componentElement, data, defaultProps),
];

export const renderInputPropsPage = (
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
  ...renderPropsMenu(data),
  ...renderInputPropsView(componentName, componentElement, data, defaultProps),
];
