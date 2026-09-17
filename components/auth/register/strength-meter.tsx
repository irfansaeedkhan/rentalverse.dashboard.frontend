import cn from "@/utils/cn";

export const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password?.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export const PasswordStrengthMeter: React.FC<{ strength: number }> = ({
  strength,
}) => {
  const getStrengthColor = () => {
    switch (strength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow";
      case 3:
        return "bg-yellow";
      case 4:
        return "bg-yellow";
      case 5:
        return "bg-green";
      default:
        return "bg-primary-light";
    }
  };

  return (
    <div className="mt-2 h-2 w-full rounded-full bg-primary-light">
      <div
        className={cn("h-2 rounded-full", getStrengthColor())}
        style={{ width: `${(strength / 5) * 100}%` }}
      ></div>
    </div>
  );
};
