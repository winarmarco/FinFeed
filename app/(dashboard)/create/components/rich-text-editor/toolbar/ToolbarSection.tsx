interface ToolbarSectionProps {
  children: React.ReactNode;
} 

const ToolbarSection: React.FC<ToolbarSectionProps> = ({children}) => {
  return <div className="flex flex-row items-center justify-center gap-x-4 px-4">
    {children}
  </div>
}

export default ToolbarSection;