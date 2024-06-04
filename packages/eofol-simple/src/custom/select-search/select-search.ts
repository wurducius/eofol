import {
  getTheme,
  sx,
  sy,
  cx,
  defineBuiltinElement,
  selector,
  createElement,
} from "@eofol/eofol";
import div from "../../primitive/div";
import flex from "../../primitive/flex";
import button from "../../ui/button/button";
import { input } from "../../ui/input/input";
import {
  SelectSearchProps,
  DefineSelectSearchProps,
  Option,
} from "@eofol/eofol-types";

const searchSelectMenu = (children: Element[]) => {
  const theme = getTheme();

  return div(
    sx({
      position: "relative",
      left: 0,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "left",
      backgroundColor: "#121212",
      overflow: "auto",
      height: "400px",
      padding: `${theme.spacing.space1} 0`,
      width: "475px",
    }),
    children
  );
};

const searchSelectMenuItem = (
  item: Option,
  onChange: any,
  state: any,
  setState: any,
  flatOptions: Option[]
) => {
  const theme = getTheme();

  return div(
    [
      sx({
        color: theme.color.secondary.base,
        cursor: "pointer",
        padding: `2px 0 2px ${theme.spacing.space4}`,
      }),
      sx(
        {
          backgroundColor: theme.color.secondary.dark,
          color: "#000000",
          fontWeight: 700,
        },
        ":hover"
      ),
    ],
    item.title,
    {},
    {
      onclick: () => {
        if (onChange) {
          onChange(item.id);
          setState({
            ...state,
            value: flatOptions.find((s) => s.id === item.id)?.title,
          });
        }
      },
    }
  );
};

const searchSelectOptGroup = (group: string) => {
  const theme = getTheme();

  return div(
    sx({ padding: `${theme.spacing.space1} ${theme.spacing.space2}` }),
    group
  );
};

sy({ position: "absolute" }, "select-search-menu-base");

sy({ display: "none" }, "select-search-menu-inactive");

sy({ display: "block" }, "select-search-menu-active");

sy(
  {
    backgroundColor: "#121212",
    height: "30px",
    width: "400px",
  },
  "select-search-input-base"
);

const searchSelect = (
  { options, value, defaultOptions, onChange, name }: SelectSearchProps,
  setState: any
) => {
  const theme = getTheme();

  const state = { options, value, defaultOptions, onChange };

  const flatOptions = options // @ts-ignore
    .map((group) => group.options)
    .flat();

  const openMenu = () => {
    const menuElement = document.getElementById("select-search-menu");
    if (menuElement) {
      menuElement.className =
        "select-search-menu-base select-search-menu-active";
    }
  };

  const closeMenu = () => {
    const menuElement = document.getElementById("select-search-menu");
    if (menuElement) {
      menuElement.className =
        "select-search-menu-base select-search-menu-inactive";
    }
  };

  const filterOptions = (pattern: string) => {
    // @ts-ignore
    const result = defaultOptions
      // @ts-ignore
      .map((option) => {
        // @ts-ignore
        if (option.group) {
          // @ts-ignore
          const result = option.options.filter(
            // @ts-ignore
            (item) =>
              !pattern ||
              item.title.toLowerCase().includes(pattern.toLowerCase())
          );
          if (result.length > 0) {
            return {
              ...option,
              // @ts-ignore
              options: result,
            };
          } else {
            return false;
          }
        } else {
          return (
            !pattern || // @ts-ignore
            option.title.toLowerCase().includes(pattern.toLowerCase())
          );
        }
      })
      .filter(Boolean);

    // @ts-ignore
    setState({
      // @ts-ignore
      defaultOptions,
      value: pattern,
      options: result,
    });
  };

  const searchSelectInputElement = input({
    value,
    name,
    onInput: (nextVal: string) => {
      filterOptions(nextVal);
    },
    onChange: () => {},
    classname: "select-search-input-base",
  });
  searchSelectInputElement.onmouseover = () => {
    openMenu();
  };

  return div(
    undefined,
    [
      flex({ alignItems: "center" }, [
        searchSelectInputElement,
        button({
          onClick: () => {
            openMenu();
          },
          children: "Open",
          classname: cx(
            sx({
              height: "36px",
              color: theme.color.secondary.base,
              border: `1px solid ${theme.color.secondary.base}`,
            }),
            sx(
              {
                backgroundColor: theme.color.secondary.dark,
                color: "#000000",
                border: `1px solid ${theme.color.secondary.base}`,
              },
              ":hover"
            )
          ),
        }),
      ]),
      div(
        "select-search-menu-base select-search-menu-inactive",
        searchSelectMenu(
          options.length > 0
            ? options
                .map((option) =>
                  // @ts-ignore
                  option.group
                    ? [
                        // @ts-ignore
                        searchSelectOptGroup(option.group),
                        // @ts-ignore
                        ...option.options.map((item) =>
                          searchSelectMenuItem(
                            item,
                            onChange,
                            state,
                            setState,
                            flatOptions
                          )
                        ),
                      ]
                    : searchSelectMenuItem(
                        // @ts-ignore
                        option,
                        onChange,
                        state,
                        setState,
                        flatOptions
                      )
                )
                .flat()
            : [
                div(
                  sx({
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }),
                  createElement("h2", undefined, "No results")
                ),
              ]
        ),
        { id: "select-search-menu" }
      ),
    ],
    {},
    {
      onmouseleave: () => {
        closeMenu();
      },
    }
  );
};

const defineSelectSearch = ({
  options,
  storeName,
  tagName,
  name,
}: DefineSelectSearchProps) => {
  defineBuiltinElement<SelectSearchProps>({
    tagName,
    initialState: { options, value: "", defaultOptions: options },
    subscribe: [storeName],
    render: (state, setState) => {
      const data = selector(storeName);
      return searchSelect(
        // @ts-ignore
        { ...state, onChange: data.onChange, name },
        setState
      );
    },
    effect: (state) => {
      const inputElement = document.getElementById(name);
      if (inputElement) {
        inputElement.focus();
        // @ts-ignore
        inputElement.value = "";
        // @ts-ignore
        inputElement.value = state.value;
      }
    },
  });
};

export default defineSelectSearch;
