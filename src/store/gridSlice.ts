import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DesignTool, GridCell, TileId } from '@/types';
import { GRID_CELLS, INITIAL_GRID } from '@/lib/catalog';

export interface GridState {
  cells: GridCell[];
  /** The palette tile (or eraser) currently picked for click-to-place. */
  tool: DesignTool;
}

export const createInitialGridState = (): GridState => ({
  cells: [...INITIAL_GRID],
  tool: null,
});

const inRange = (i: number) => Number.isInteger(i) && i >= 0 && i < GRID_CELLS;

const gridSlice = createSlice({
  name: 'grid',
  initialState: createInitialGridState,
  reducers: {
    /** Picks a palette tile; picking the active tile again deselects it. */
    selectTile(state, action: PayloadAction<TileId>) {
      const same = state.tool?.kind === 'tile' && state.tool.tileId === action.payload;
      state.tool = same ? null : { kind: 'tile', tileId: action.payload };
    },
    toggleEraser(state) {
      state.tool = state.tool?.kind === 'eraser' ? null : { kind: 'eraser' };
    },
    clearTool(state) {
      state.tool = null;
    },
    placeTile(state, action: PayloadAction<{ index: number; tileId: TileId }>) {
      if (inRange(action.payload.index)) state.cells[action.payload.index] = action.payload.tileId;
    },
    clearCell(state, action: PayloadAction<number>) {
      if (inRange(action.payload)) state.cells[action.payload] = null;
    },
    /** Applies the active tool to a cell (click-to-place). */
    applyTool(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (!inRange(index) || !state.tool) return;
      if (state.tool.kind === 'eraser') state.cells[index] = null;
      else state.cells[index] = state.tool.tileId;
    },
    /** Drag from one cell to another: swaps their contents. */
    moveTile(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      if (!inRange(from) || !inRange(to) || from === to) return;
      [state.cells[from], state.cells[to]] = [state.cells[to], state.cells[from]];
    },
    fillEmpty(state, action: PayloadAction<TileId>) {
      state.cells = state.cells.map((c) => c ?? action.payload);
    },
    clearGrid(state) {
      state.cells = Array<GridCell>(GRID_CELLS).fill(null);
    },
    resetGrid: () => createInitialGridState(),
  },
});

export const {
  selectTile,
  toggleEraser,
  clearTool,
  placeTile,
  clearCell,
  applyTool,
  moveTile,
  fillEmpty,
  clearGrid,
  resetGrid,
} = gridSlice.actions;
export default gridSlice.reducer;
