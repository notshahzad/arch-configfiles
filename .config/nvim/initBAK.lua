vim.cmd [[packadd packer.nvim]]
return require('packer').startup(function()
use 'wbthomason/packer.nvim'
use {'neoclide/coc.nvim', branch = 'release'}
use 'scrooloose/nerdtree'
use 'tpope/vim-surround'
use 'nvim-treesitter/nvim-treesitter'
use 'Xuyuanp/nerdtree-git-plugin'
use 'tiagofumo/vim-nerdtree-syntax-highlight'
use 'ryanoasis/vim-devicons'
use 'airblade/vim-gitgutter'
use 'ctrlpvim/ctrlp.vim'
use 'scrooloose/nerdcommenter'
use 'christoomey/vim-tmux-navigator'
use 'arcticicestudio/nord-vim'
use 'vim-airline/vim-airline'
use 'vim-airline/vim-airline-themes'
use 'HerringtonDarkholme/yats.vim'
end)
