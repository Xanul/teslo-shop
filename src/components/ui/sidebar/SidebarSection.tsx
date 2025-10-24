interface SidebarSectionProps {
  children: React.ReactNode;
  title?: string;
}

export const SidebarSection = ({ children, title }: SidebarSectionProps) => {
  return (
    <div>
      {title && (
        <h3 className="px-2 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};
