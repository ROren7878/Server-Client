IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [categories] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_categories] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [companies] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_companies] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [subcategories] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_subcategories] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [users] (
    [Id] int NOT NULL IDENTITY,
    [UserName] nvarchar(max) NOT NULL,
    [City] nvarchar(max) NOT NULL,
    [street] nvarchar(max) NOT NULL,
    [house] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Phone] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_users] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [products] (
    [Id] int NOT NULL IDENTITY,
    [ProductName] nvarchar(max) NOT NULL,
    [Desc] nvarchar(max) NOT NULL,
    [Price] float NOT NULL,
    [Quantity] int NOT NULL,
    [Src] nvarchar(max) NOT NULL,
    [CategoryId] int NULL,
    [SubCategoryId] int NULL,
    [CompanyId] int NULL,
    CONSTRAINT [PK_products] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_products_categories_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [categories] ([Id]),
    CONSTRAINT [FK_products_companies_CompanyId] FOREIGN KEY ([CompanyId]) REFERENCES [companies] ([Id]),
    CONSTRAINT [FK_products_subcategories_SubCategoryId] FOREIGN KEY ([SubCategoryId]) REFERENCES [subcategories] ([Id])
);
GO

CREATE TABLE [orders] (
    [Id] int NOT NULL IDENTITY,
    [OrderDate] datetime2 NOT NULL,
    [OrderSum] float NOT NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_orders] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_orders_users_UserId] FOREIGN KEY ([UserId]) REFERENCES [users] ([Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_orders_UserId] ON [orders] ([UserId]);
GO

CREATE INDEX [IX_products_CategoryId] ON [products] ([CategoryId]);
GO

CREATE INDEX [IX_products_CompanyId] ON [products] ([CompanyId]);
GO

CREATE INDEX [IX_products_SubCategoryId] ON [products] ([SubCategoryId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250515152610_AlignWithDatabase', N'8.0.0');
GO

COMMIT;
GO

