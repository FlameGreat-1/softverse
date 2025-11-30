export interface RagChunk {
  id: string;
  title: string;
  content: string;
  embedding?: number[];
}
