import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu, MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Link from 'next/link';

export const MenuBar = () => {
  return (
    <Menubar>
      <div className={'px-2 text-xl'}>
        Data Analysis
      </div>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>创建</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <Link href={'/dashboard/book-rank'}>
                  书籍分析
                </Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>关于</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href={'https://xdean.cn'} target={'_blank'}>
              访问 xdean.cn ...
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className={'!ml-auto px-2 bg-primary rounded text-primary-foreground text-xl content-end'}>
        XDean
      </div>
    </Menubar>
  );
};