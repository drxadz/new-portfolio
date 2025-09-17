import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const GITHUB_REPO = 'drxadz/oscp-prep';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchGitHubTree() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1`;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-build-script'
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

async function fetchMarkdownContent(path) {
  const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${path}`;
  const headers = {
    'User-Agent': 'portfolio-build-script'
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }
  
  return response.text();
}

function extractExcerpt(content, maxLength = 200) {
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
}

function getCategoryFromPath(filePath) {
  const parts = filePath.split('/');
  return parts.length > 1 ? parts[0] : 'General';
}

async function buildNotesIndex() {
  console.log('🔍 Fetching GitHub repository tree...');
  
  try {
    const tree = await fetchGitHubTree();
    
    // Filter for .md files
    const markdownFiles = tree.tree.filter(item => 
      item.type === 'blob' && 
      item.path.endsWith('.md') &&
      !item.path.startsWith('.') // Skip hidden files
    );
    
    console.log(`📝 Found ${markdownFiles.length} markdown files`);
    
    const notesIndex = [];
    
    for (const file of markdownFiles) {
      try {
        console.log(`📖 Processing: ${file.path}`);
        
        const content = await fetchMarkdownContent(file.path);
        const { data: frontmatter, content: markdownContent } = matter(content);
        
        const slug = file.path.replace('.md', '');
        const category = getCategoryFromPath(file.path);
        
        const note = {
          slug,
          path: file.path,
          title: frontmatter.title || path.basename(slug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          tags: frontmatter.tags || [],
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          excerpt: frontmatter.excerpt || extractExcerpt(markdownContent),
          category,
          content: markdownContent,
          frontmatter
        };
        
        notesIndex.push(note);
        
        // Add small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.warn(`⚠️  Skipping ${file.path}: ${error.message}`);
      }
    }
    
    // Sort by date (newest first)
    notesIndex.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write index file
    const indexPath = path.join(publicDir, 'notes-index.json');
    fs.writeFileSync(indexPath, JSON.stringify(notesIndex, null, 2));
    
    console.log(`✅ Generated notes index with ${notesIndex.length} entries`);
    console.log(`📄 Index saved to: ${indexPath}`);
    
    // Log categories found
    const categories = [...new Set(notesIndex.map(note => note.category))];
    console.log(`📂 Categories found: ${categories.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error building notes index:', error.message);
    process.exit(1);
  }
}

// Run the build
buildNotesIndex();
