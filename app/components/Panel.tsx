import React from "react";

type Props = React.PropsWithChildren<{
  header: string;
}>;

const Panel: React.FC<Props> = ({ header, children }) => {
  return (
    <div className="ais-Panel">
      <div className="ais-Panel-header">
        <span>{header}</span>
      </div>
      <div className="ais-Panel-body">{children}</div>
    </div>
  );
};
export default Panel;
