import React from "react";

interface FeedCardButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  count: number;
}

export const FeedCardButton: React.FC<FeedCardButtonProps> = ({
  icon,
  count,
  onClick,
}) => {
  return (
    <button className="flex flex-row gap-x-0.5" onClick={() => {onClick()}}>
      {icon}
      <span>{count}</span>
    </button>
  );
};
