type PinButtonProps = {
  pinned: boolean;
  onToggle: () => void;
};

export default function PinButton({ pinned, onToggle }: PinButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={pinned}
      className={`pin-control shrink-0 text-[0.65rem] font-mono transition-colors ${pinned ? "text-white" : "text-white/35 hover:text-white"}`}
    >
      {pinned ? "pinned" : "pin"}
    </button>
  );
}
