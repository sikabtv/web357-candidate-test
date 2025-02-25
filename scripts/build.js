const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Helper function to create a zip file from specified files and directories
const createZipFromItems = (zipPath, items, flatten = false) => {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', {
            zlib: {level: 9} // Maximum compression
        });

        output.on('close', () => resolve());
        archive.on('error', (err) => reject(err));

        archive.pipe(output);

        // Add folders
        if (items.folders) {
            items.folders.forEach((folder) => {
                if (fs.existsSync(folder)) {
                    if (flatten) {
                        // Flatten the folder: Add contents without including the folder structure
                        archive.directory(folder, false); // false ensures no parent folder is added
                    } else {
                        // Add the folder with its structure
                        archive.directory(folder, path.basename(folder)); // Folder itself will be included
                    }
                } else {
                    console.error(`${folder} does not exist!`);
                }
            });
        }

        // Add files
        if (items.files) {
            items.files.forEach((file) => {
                if (fs.existsSync(file)) {
                    archive.file(file, {name: path.basename(file)}); // Add file to zip
                } else {
                    console.error(`${file} does not exist!`);
                }
            });
        }

        archive.finalize();
    });
};

// Helper for cleaning up files
const deleteFile = (filePath) => {
    try {
        fs.unlinkSync(filePath);
    } catch (err) {

    }
};

// Function to create the final combined zip
const createFinalZip = async () => {
    deleteFile('web357-candidate-test.zip');

    // Create component zip
    const componentFiles = {
        folders: ['administrator', 'installer', 'media', 'site', 'webservices'],
        files: ['web357test.xml']
    };
    await createZipFromItems('com_web357test.zip', componentFiles, false);

    // Create module zip
    const moduleFiles = {
        folders: ['modules/site/mod_web357_random_recipe'],
    };
    await createZipFromItems('mod_web357_random_recipe.zip', moduleFiles, true);

    // Create the final zip file
    const finalZip = fs.createWriteStream('web357-candidate-test.zip');
    const finalArchive = archiver('zip', {
        zlib: {level: 9} // Maximum compression
    });

    finalZip.on('close', () => {
        // Clean up the temporary zip files after they've been added to the final zip
        deleteFile('com_web357test.zip');
        deleteFile('mod_web357_random_recipe.zip');
        console.log('Combined zip has been created successfully.');
    });

    finalArchive.on('error', (err) => {
        console.error('Error during final zip creation:', err);
    });

    finalArchive.pipe(finalZip);

    // Create 'package' directory in the zip and add mod_test.zip and mod_test2.zip inside it
    finalArchive.append(fs.createReadStream('com_web357test.zip'), {name: 'packages/com_web357test.zip'});
    finalArchive.append(fs.createReadStream('mod_web357_random_recipe.zip'), {name: 'packages/mod_web357_random_recipe.zip'});

    finalArchive.append(fs.createReadStream('scripts/pkg_web357test.xml'), {name: 'pkg_web357test.xml'});

    // Finalize the final zip archive
    finalArchive.finalize();
};

// Run the process
createFinalZip().catch(err => {
    console.error('Error:', err);
});
