export interface FlexDirectionProps {
  gap: string;
  direction: string;
}

export interface DataType {
  id: string;
  call_type: string;
  direction: string;
  duration: number;
  from: string;
  to: string;
  via: string;
  created_at: string;
  is_archived: boolean;
  notes: {
    id: string;
    content: string;
  }[];
}

export interface AddNoteModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (data: any) => void; 
  record: DataType;
}

export interface CustomTableProps {
  calls: DataType[];
  totalCalls: number;
  pageSize: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (current: number, size: number) => void;
  status: string;
}