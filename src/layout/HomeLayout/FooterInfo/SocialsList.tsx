import { SOCIALS } from "./constants";
import { RoundedButton, SvgGenerator } from "../../../components";
import { RoundedButtonColor, RoundedButtonSize } from "../../../components/enums";

const classes = {
  wrapper: "flex gap-[16px]",
  button: "hover:bg-grey-500",
};

const SocialsList = () => {
  return (
    <div className={classes.wrapper}>
      {SOCIALS.map((social) => (
        <RoundedButton
          as="link"
          href={social.href}
          target="_blank"
          size={RoundedButtonSize.Md}
          color={RoundedButtonColor.Dark400}
          styles={classes.button}
          key={social.id}
        >
          <SvgGenerator
            id={social.id}
            colorFill="fill-white"
          />
        </RoundedButton>
      ))}
    </div>
  );
};

export default SocialsList;
