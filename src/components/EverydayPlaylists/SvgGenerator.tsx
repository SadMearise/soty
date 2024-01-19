import { FC } from "react";

type SvgGeneratorProps = {
  id: string;
  className?: string;
};

const SvgGenerator: FC<SvgGeneratorProps> = ({ id, className }) => {
  switch (id) {
    case "play":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          className={className}
        >
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M8 5v14l11-7z" />
        </svg>
      );
    case "pause":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          className={className}
        >
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      );
    default:
      return <svg />;
  }
};

export default SvgGenerator;
