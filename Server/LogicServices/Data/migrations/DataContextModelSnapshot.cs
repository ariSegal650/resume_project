﻿// <auto-generated />
using System;
using LogicServices.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LogicServices.Data.migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("LogicServices.Entities.StatisticsInfoClass", b =>
                {
                    b.Property<Guid>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("city")
                        .HasColumnType("TEXT");

                    b.Property<int?>("clicks")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("download")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("loginDate")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("UsersStatistics");
                });

            modelBuilder.Entity("LogicServices.Entities.UserDataClass", b =>
                {
                    b.Property<string>("email")
                        .HasColumnType("TEXT");

                    b.Property<string>("color")
                        .HasColumnType("TEXT");

                    b.Property<string>("page1")
                        .HasColumnType("TEXT");

                    b.Property<string>("page2")
                        .HasColumnType("TEXT");

                    b.Property<string>("page3")
                        .HasColumnType("TEXT");

                    b.Property<string>("url")
                        .HasColumnType("TEXT");

                    b.HasKey("email");

                    b.ToTable("UsersData");
                });
#pragma warning restore 612, 618
        }
    }
}
