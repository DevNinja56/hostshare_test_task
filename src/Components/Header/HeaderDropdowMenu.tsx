type HeaderDropdowMenuProps = {
  data: string[];
  dataSetter: (item: any) => void;
};

const HeaderDropdowMenu: React.FC<HeaderDropdowMenuProps> = ({
  data = [],
  dataSetter = (item) => {},
}) => {
  return (
    <div className="flex flex-col gap-2">
      {data.length < 1 && <div>No Result Found</div>}
      {data.map((item: string) => (
        <div
          key={item}
          className="min-w-[300px] p-[10px] hover:bg-slate-200 cursor-pointer transition-all duration-500 rounded-md"
          onClick={() => dataSetter(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default HeaderDropdowMenu;
