"use client";

interface CircularLoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  text?: string;
  className?: string;
}

export function CircularLoader({ 
  size = "md", 
  color = "primary", 
  text,
  className = "" 
}: CircularLoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const colorClasses = {
    primary: "border-[#5937E0]",
    white: "border-white",
    gray: "border-gray-400"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`
          animate-spin rounded-full border-2 border-t-transparent
          ${sizeClasses[size]}
          ${colorClasses[color]}
        `}
      />
      {text && (
        <p className={`mt-2 text-sm ${
          color === "white" ? "text-white" : "text-gray-600"
        }`}>
          {text}
        </p>
      )}
    </div>
  );
}

export function LoadingPage({ text = "Chargement des données..." }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <CircularLoader size="lg" color="primary" text={text} />
    </div>
  );
}

export function LoadingCard({ text = "Chargement..." }: { text?: string }) {
  return (
    <div className="max-w-lg mx-auto p-4 text-center">
      <CircularLoader size="md" color="primary" text={text} />
    </div>
  );
}

export function LoadingButton({ 
  loading, 
  children, 
  className = "" 
}: { 
  loading: boolean; 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      )}
      {children}
    </div>
  );
}
