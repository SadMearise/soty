import { FC, SetStateAction, Dispatch, KeyboardEvent } from "react";
import { Button, SvgGenerator } from ".";

type SearchBarProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const classes = {
  formWrapper: "relative",
  formInput:
    "h-[48px] text-sm font-normal bg-dark-500 px-[36px] py-[6px] rounded-full w-full hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] focus:shadow-[0_0_0_2px_rgba(255,255,255,1)] placeholder-grey-400",
  formIcons: "flex justify-between px-[12px] w-full items-center absolute top-0 bottom-0 pointer-events-none",
};

const SearchBar: FC<SearchBarProps> = ({ value, setValue, placeholder, onKeyDown }) => {
  return (
    <div className={classes.formWrapper}>
      <form role="search">
        <input
          className={classes.formInput}
          placeholder={placeholder}
          onChange={(event) => setValue(event.target.value)}
          value={value}
          onKeyDown={onKeyDown}
        />
      </form>
      <div className={classes.formIcons}>
        <SvgGenerator
          id="search"
          size="16px"
          colorFill="fill-white"
        />
        {value && (
          <Button
            as="button"
            type="button"
            aria-label="close"
            onClick={() => setValue("")}
            styles="pointer-events-auto"
          >
            <SvgGenerator
              id="close"
              size="16px"
              colorFill="fill-white"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
